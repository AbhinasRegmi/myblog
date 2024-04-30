"use client";

import {
    useRef,
    useState,
    useEffect,
    useContext,
    useTransition,
} from "react";
import { ActivityIcon, Link as LinkLucide } from "lucide-react";

import { blogContext } from "@/context/blog-context";
import {
    updateBlogComponentAction,
    deleteBlogComponentAction
} from "@/action/blog";
import { cn } from "@/lib/utils";
import { useSetIndicator } from "@/hooks/useSetIndicator";
import { StaticImage, ImageContext } from "@/components/blog/image";
import { CodeHighlighter, SupportedLanguages, SupportedLanguageType } from "@/components/blog/code-highlighter";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel
} from "@/components/ui/select";
import { Button } from "../ui/button";

export type BlogLabels = "title" | "image" | "pararaph" | "link" | "code" | "line-gap";
export interface BlogComponentProps {
    label: BlogLabels;
    content: string;
    id: string;
    blogId: string;
    position: number;
    isEditable?: boolean;
}

function TitleBlock(props: BlogComponentProps) {
    const { blockRef, handleInput } = useBlockRef(props);

    return (
        <div className="pt-8 pb-4">
            <h1
                ref={blockRef}
                onInput={(e) => handleInput(e.currentTarget.textContent ?? '')}
                contentEditable={props.isEditable ?? false}

                className={
                    cn(
                        "-ml-1 scroll-m-20 text-4xl font-extrabold ",
                        "tracking-tight lg:text-5xl py-2 focus:outline-none after:opacity-30 whitespace-break-spaces",
                        !!!props.content && "empty:after:content-['Title...']"
                    )
                }>
            </h1>
        </div>
    )
}

function ParagraphBlock(props: BlogComponentProps) {
    const { blockRef, handleInput } = useBlockRef(props);

    return (
        <div className="inline">
            <p
                ref={blockRef}
                onInput={e => handleInput(e.currentTarget.textContent ?? '')}
                contentEditable={props.isEditable ?? false}
                className={
                    cn(
                        "focus:outline-none after:opacity-30 inline-flex text-lg whitespace-break-spaces",
                        !!!props.content && "empty:after:content-['Paragraph...']"
                    )
                }>
            </p>
        </div>
    )
}

function ImageBlock(props: BlogComponentProps) {
    return (
        <div>
            {
                props.isEditable ? <ImageContext {...props} /> : <StaticImage publicUrl={props.content} data={props} />
            }
        </div>
    )
}

function LinkBlock(props: BlogComponentProps) {
    let linkRef = useRef<HTMLAnchorElement>(null);
    const [isPending, startTransition] = useTransition();
    useSetIndicator(isPending);
    const [isHref, setIsHref] = useState<boolean>(true);
    const { dispatch } = useContext(blogContext);
    const SEPARATOR = '(---;;;---)';


    function inputHandler(data: string) {

        if (!props.isEditable) return;

        if (linkRef.current?.href) {

            startTransition(async () => {
                const content = linkRef.current?.href + SEPARATOR + data;

                await updateBlogComponentAction({
                    ...props,
                    content: content
                });
            })
        }
    }


    useEffect(() => {
        if (!props.isEditable) return;

        const ref = linkRef.current;

        function keyHandler(event: KeyboardEvent) {
            if (!ref) return;

            if (event.key === 'Backspace' && ref.textContent === '') {

                !!dispatch && dispatch({
                    type: 'delete',
                    id: props.id,
                    blogID: props.blogId,
                    label: props.label
                })

                startTransition(async () => {
                    await deleteBlogComponentAction({
                        blogID: props.blogId,
                        componentID: props.id
                    });
                })

            } else if (event.key === 'Enter') {
                event.preventDefault();

                if (!!!ref.href) {
                    ref.href = ref.textContent ?? '';
                    ref.textContent = '';
                    setIsHref(false);
                } else {
                    ref.blur();
                }
            }
        }

        if (!props.content) {
            ref?.focus();
        } else {
            const sep = props.content.split(SEPARATOR);

            if (sep.length === 2) {
                if (ref) {
                    ref.href = sep[0];
                    ref.textContent = sep[1];
                    setIsHref(false);
                }
            }
        }

        ref?.addEventListener('keydown', keyHandler);

        return () => {
            ref?.removeEventListener('keydown', keyHandler);
        }
    }, [props, dispatch])

    return (
        <div className="inline gap-1 items-center">
            <a
                ref={linkRef}
                target="_blank"
                contentEditable={props.isEditable ?? false}
                onInput={e => inputHandler(e.currentTarget.textContent ?? '')}
                className={cn(
                    "focus:outline-none text-lg underline after:opacity-50 inline-flex",
                    !!!props.content && !isHref && "empty:after:content-['Enter_label_for_link']",
                    !!!props.content && isHref && "empty:after:content-['Enter_link_and_press_enter']"
                )}
            >

            </a>
            {
                !isHref && <LinkLucide size={16} className="text-muted-foreground inline" />
            }
        </div>
    )
}

function LineGapBlock(props: BlogComponentProps) {
    const [isPending, startTransition] = useTransition();
    const { dispatch } = useContext(blogContext);

    useEffect(() => {
        if (!props.isEditable) return;

        startTransition(async () => {
            await updateBlogComponentAction({
                ...props
            })
        })
    })

    function doubleClickHandler() {

        if (!props.isEditable) return;

        !!dispatch && dispatch({
            type: 'delete',
            id: props.id,
            blogID: props.blogId,
            label: props.label,
        })

        startTransition(async () => {
            await deleteBlogComponentAction({
                blogID: props.blogId,
                componentID: props.id
            })
        })
    }

    return (
        <div
            onDoubleClick={doubleClickHandler}
            className={
                cn(
                    "select-none group relative",
                    props.isEditable && "border-x-2",
                    props.isEditable && "cursor-pointer"
                )
            }
        >
            <br />
            <br />
            {
                props.isEditable && (
                    <div
                        className={cn(
                            "absolute inset-0 hidden",
                            props.isEditable && "group-hover:flex items-center justify-center"
                        )}
                    >

                        <p className="text-sm text-muted-foreground">Double click to remove.</p>
                    </div>
                )
            }
        </div>
    )
}

function CodeBlock(props: BlogComponentProps) {
    const SEPARATOR = '(---;;;---)';
    const [lang, data] = props.content.split(SEPARATOR);
    const [code, setCode] = useState<string>(data ?? '');
    const [language, setLanguage] = useState<SupportedLanguageType>(lang as SupportedLanguageType ?? 'typescript');
    const [isPending, startTransition] = useTransition();
    const { dispatch } = useContext(blogContext);
    useSetIndicator(isPending);
    //TODO: code portion is always triggering updates no idea why.

    let timer = useRef<any>(null);

    useEffect(() => {
        if (!props.isEditable) return;

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            startTransition(async () => {
                await updateBlogComponentAction({
                    ...props,
                    content: language + SEPARATOR + code
                })
            })
        }, 400);

    }, [props, code, language])

    function deleteCode() {
        startTransition(async () => {
            deleteBlogComponentAction({
                blogID: props.blogId,
                componentID: props.id
            }).then(d => {
                if (d.error) throw new Error(d.error);

                dispatch && dispatch({
                    id: props.id,
                    blogID: props.blogId,
                    label: props.label,
                    type: 'delete'
                })
            })
        })
    }

    return (
        <div
            className={
                cn(
                    "space-y-3 relative w-full h-auto max-h-[300px] isolate group",
                    props.isEditable && "mt-12"
                )
            }>

            {
                props.isEditable && (
                    <div className="
                        absolute z-10 opacity-25
                        right-0 p-2
                        flex items-center gap-2
                        hover:opacity-100
                    ">
                        <Select
                            onValueChange={e => setLanguage(e as SupportedLanguageType)}
                            defaultValue={language}
                        >
                            <SelectTrigger className={"w-[180px]"}>
                                <SelectValue placeholder={"Select a language"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Languages</SelectLabel>

                                    {
                                        SupportedLanguages.map(i => (
                                            <SelectItem value={i} key={i}>{i}</SelectItem>
                                        ))
                                    }

                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            variant={"destructive"}
                            onClick={() => deleteCode()}
                        >
                            Remove
                        </Button>
                    </div>
                )
            }

            <CodeHighlighter
                code={code}
                setCode={setCode}
                language={language}
                isReadonly={!props.isEditable}
            />

        </div>
    )
}


export function RenderBlock(block: BlogComponentProps) {
    switch (block.label) {
        case "title":
            return (
                <TitleBlock key={block.id} {...block} />
            )
        case "pararaph":
            return (
                <ParagraphBlock key={block.id} {...block} />
            )
        case "image":
            return (
                <ImageBlock key={block.id} {...block} />
            )
        case "link":
            return (
                <LinkBlock key={block.id} {...block} />
            )
        case "line-gap":
            return (
                <LineGapBlock key={block.id} {...block} />
            )
        case "code":
            return (
                <CodeBlock key={block.id} {...block} />
            )

        default: {
            throw new Error("Unhandled component type...")
        }
    }
}

function useBlockRef(block: BlogComponentProps) {
    const [isPending, startTransition] = useTransition();
    useSetIndicator(isPending);

    //TODO: Show Error status.

    const blockRef = useRef<HTMLDivElement>(null);
    const { dispatch } = useContext(blogContext);
    let timer: any = null;



    function handleInput(content: string) {
        if (!block.isEditable) return;

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(
            () => {
                startTransition(async () => {
                    await updateBlogComponentAction({
                        ...block,
                        content
                    });
                })
            },
            400
        )
    }

    useEffect(() => {

        if (!block.isEditable) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Backspace' && blockRef.current?.textContent === '') {
                if (dispatch) {
                    startTransition(async () => {
                        deleteBlogComponentAction({
                            blogID: block.blogId,
                            componentID: block.id
                        }).then(
                            (data) => {
                                if (data.success) {
                                    dispatch({ type: 'delete', id: block.id, label: block.label, blogID: block.blogId });
                                } else {
                                    throw new Error(data.error)
                                }
                            }
                        )
                    })
                }
            }
        }

        const current = blockRef.current;

        current?.addEventListener('keydown', handleKeyDown);

        if (current?.textContent === '') {
            current.textContent = block.content;
        }

        if (!block.content) {
            current?.focus();
        }

        return () => {
            current?.removeEventListener("keydown", handleKeyDown);
        }
    }, [block, dispatch])


    return { blockRef, handleInput }
}