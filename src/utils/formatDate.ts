import { format } from "date-fns";

export default function formatDate(num: number) {
    const date = new Date(num * 1000);
    return format(date, "dd/MM/yyyy");
}
