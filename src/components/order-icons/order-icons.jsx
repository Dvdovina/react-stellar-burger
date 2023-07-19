import orderIconsStyle from './order-icons.module.css'

function OrderIcons({orderIngredients}) {




    const sortedIngredients = orderIngredients.slice(0, 4);

    const loadIngredients = () => {
        return sortedIngredients.map((ingredient, i) => (
            <div key={i} className={orderIconsStyle.img} style={{ backgroundImage: `url('${ingredient?.image_mobile}')` }} />
        ));
    };


    return (
        <li className={orderIconsStyle.icons} key={5} >
            <div className={orderIconsStyle.img}
                style={{ backgroundImage: `url('${orderIngredients[5]?.image_mobile}')` }}>
                <div className={orderIconsStyle.overlay}>{`+${orderIngredients.length - 5}`}
                </div>
            </div>
        </li>
    )
}

export default OrderIcons