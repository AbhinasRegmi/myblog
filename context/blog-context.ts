import { createContext } from "react";

import { BlogComponentProps, BlogLabels } from "@/components/blog/comp";

export type Actions = 'create' | 'delete';
export interface BlogReducerActionType {
    type: Actions;
    label: BlogLabels;
    blogID: string;
    id?: string;
}

export function blogReducer(state: Array<BlogComponentProps>, action: BlogReducerActionType): Array<BlogComponentProps> {
    switch (action.type) {
        case "create":
            const blockID = crypto.randomUUID();
            const length = state.at(-1)?.position ?? 0;

            if(length === 0){
                return [
                    {
                        label: "title",
                        content: "",
                        id: blockID,
                        position: length + 1,
                        blogId: action.blogID,
                        isEditable: true
                    }
                ]
            }

            switch (action.label) {
                case "title":
                case "paragraph":
                case "image":
                case "link":
                case "line-gap":
                case "code":
                    return [
                        ...state,
                        {
                            label: action.label,
                            content: "",
                            id: blockID,
                            position: length + 1,
                            blogId: action.blogID,
                            isEditable: true
                        }

                    ]
                default:
                    return state
            }
        case "delete":
            if(action.label === 'title'){
                return state
            }

            if(action.id){
                return state.filter(block => block.id !== action.id);
            }

            throw new Error("BlockID is required to delete a component.")
        default:
            throw new Error("Unhandled blog component.")
    }
}


interface BlogContextInterface {
    dispatch: ((i: BlogReducerActionType) => void) | null
}

export const blogContext = createContext<BlogContextInterface>({ dispatch: null });


