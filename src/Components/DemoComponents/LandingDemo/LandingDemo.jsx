import CategoriesDemo from "./CategoriesDemo.component";
import "./LandingDemo.styles.scss";



const LandingDemo = () => {

    const categories = [
        {
            id: "0",
            title: "hats",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ESNNhofV7oJnyXiAkWDiBmVyCO8Zco2aGsSPYOLQ0w&s"
        },
        {
            id: "1",
            title: "jackets",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtX9x6T6IaqWCtzW2aE3649Jp8Xd7hyJkDAFHqollIGA&s"
        },
        {
            id: "2",
            title: "sneakers",
            imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPEfICmpFUmA_zu8eptAh8odbuNC9GwHvHTx3XGBrrHw&s"
        },
        {
            id: "3",
            title: "women's",
            imgUrl: "https://www.cdc.gov/women/womenshealthcdc/images/iStock-1141394588.jpg"
        },
        {
            id: "4",
            title: "men's",
            imgUrl: "https://www.realmenrealstyle.com/wp-content/uploads/2023/08/5-Simple-Tips-To-Raise-Your-Status-As-A-Man.jpg"
        },
    ]

    return (
        <>
            {
                categories.map((category) => {
                    return (
                        <>
                            <CategoriesDemo key={category.id} categories={category} />
                        </>
                    )
                })
            }
        </>
    )
}



export default LandingDemo;