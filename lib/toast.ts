import { ReactNode } from 'react';
import {ExternalToast, toast as sonner_toast} from 'sonner';

import {cn} from "@/lib/utils";

export function toast(message: ReactNode, data?: ExternalToast){
    return (
        sonner_toast(
            message, {
                ...data,
                className: cn("md:fixed md:left-6 md:bottom-6",  data?.className),
            }
        )
    )
}