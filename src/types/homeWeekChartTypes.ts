type HomeWeekChartTypes = {
    sectionType: string;
    items: HomeWeekChartTypesItems[];
};

type HomeWeekChartTypesItems = {
    banner: string;
    cover: string;
    country: string;
    type: string;
    group: {
        id: string;
        name: string;
        type: string;
        link: string;
    }[];
    link: string;
    startDate: string;
    endDate: string;
};

export type { HomeWeekChartTypesItems };

export default HomeWeekChartTypes;
