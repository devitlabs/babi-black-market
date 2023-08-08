


export const CategoryRange = (data: any) => {
    let categories:any = [];
    data.forEach((element: any) => {
        if (element?.ancestors) {
            element?.ancestors?.nodes?.forEach((item: any) => {
                categories.push(
                    {
                        id: item.id,
                        name: item.name,
                        count: item.count,
                        image: item.image?.sourceUrl
                    }
                )
            });
        } else {
            categories.push(
                {
                    id: element?.id,
                    name: element?.name,
                    count: element?.count,
                    image: element.image?.sourceUrl
                }
            )
        }
    });
    return categories;
}