import orderIconsOverlayStyle from './order-icons-overlay.module.css'

function OrderIconsOverlay({orderIngredients}) {

    return (
            <div className={orderIconsOverlayStyle.img}
                style={{ backgroundImage: `url('${orderIngredients[5]?.image_mobile}')` }}>
                <div className={orderIconsOverlayStyle.overlay}>{`+${orderIngredients.length - 5}`}
                </div>
            </div>
    )
}

export default OrderIconsOverlay