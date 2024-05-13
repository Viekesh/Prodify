



const CategoriesDemo = ({ categories }) => {

    const { id, title, imgUrl } = categories;

    return (
        <>
            <section className="categories">

                <div className="category" key={id}>
                    <div
                        className="background_img"
                        style={
                            {
                                backgroundImage: `url(${imgUrl})`
                            }
                        }
                    />

                    <div className="category_body">
                        <h3>{title}</h3>
                        <button>shop now</button>
                    </div>
                </div>

            </section>
        </>
    );
};



export default CategoriesDemo;