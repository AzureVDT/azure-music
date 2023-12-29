import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return formatDistanceToNow(date, { addSuffix: true, locale: vi });
};

export default formatDateTime;
