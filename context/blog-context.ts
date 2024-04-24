import { createContext } from "react";

import {BlogComponentProps, BlogLabels} from "@/components/blog/comp";

export type Actions = 'create' | 'update' | 'delete';
export interface BlogReducerActionType {
    type: Actions;
    label: BlogLabels;
    id?: string;
}

export function blogReducer(state: Array<BlogComponentProps>, action: BlogReducerActionType): Array<BlogComponentProps> {
    switch (action.type) {
        case "create":
            if(action.label === "title"){
                return [
                    {
                        label: "title",
                        content: "",
                        id: "abhinas",
                        blogId: "something",
                        isEditable: true,
                        position: 0
                    }
                ]
            }
            return state;
        default:
            throw new Error("Unhandled blog component.")
    }
}


interface BlogContextInterface {
    dispatch: ((i: BlogReducerActionType) => void) | null
}

export const blogContext = createContext<BlogContextInterface>({dispatch: null});


