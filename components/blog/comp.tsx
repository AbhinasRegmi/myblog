"use client";

import {
    useRef,
    useState,
    useEffect,
    useContext,
    useTransition,
} from "react";
import { Link as LinkLucide } from "lucide-react";

import { blogContext } from "@/context/blog-context";
import {
    updateBlogComponentAction,
    deleteBlogComponentAction
} from "@/action/blog";
import { cn } from "@/lib/utils";
import { StaticImage, ImageContext } from "@/components/blog/image";

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
    const [isHref, setIsHref] = useState<boolean>(true);
    const { dispatch } = useContext(blogContext);
    const SEPARATOR = '(---;;;---)';


    function inputHandler(data: string) {

        if(!props.isEditable) return;

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
        if(!props.isEditable) return;

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
        if(!props.isEditable) return;

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

        default: {
            throw new Error("Unhandled component type...")
        }
    }
}

function useBlockRef(block: BlogComponentProps) {
    const [isPending, startTransition] = useTransition();

    //TODO: Show pending status to show updating and other side effects.

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
                    dispatch({ type: 'delete', id: block.id, label: block.label, blogID: block.blogId });

                    startTransition(async () => {
                        await deleteBlogComponentAction({
                            blogID: block.blogId,
                            componentID: block.id
                        });
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