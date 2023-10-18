import orderIconsOverlayStyle from './order-icons-overlay.module.css';
import { FC } from 'react';
import { TIngredient } from '../../utils/common-types';

interface IOrderIconsOverlayProps {
    orderIngredients: (TIngredient | undefined)[] | undefined
}

const OrderIconsOverlay: FC<IOrderIconsOverlayProps> = ({ orderIngredients }) => {
    return (
        <div className={orderIconsOverlayStyle.img}
            style={{ backgroundImage: `url('${orderIngredients[5]?.image_mobile}')` }}>
            <div className={orderIconsOverlayStyle.overlay}>{`+${orderIngredients.length - 5}`}</div>
        </div>
    );
};

export default OrderIconsOverlay;