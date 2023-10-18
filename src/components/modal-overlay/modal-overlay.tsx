import overlayStyles from "./modal-overlay.module.css"
import { FC } from "react"

interface IModalOverlayProps {
    onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
    return (
        <div onClick={onClose} className={overlayStyles.overlay}></div>
    )
}

export default ModalOverlay