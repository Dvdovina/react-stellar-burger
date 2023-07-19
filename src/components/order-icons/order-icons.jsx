import orderIconsStyle from './order-icons.module.css'

function OrderIcons({orderIngredients}) {

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