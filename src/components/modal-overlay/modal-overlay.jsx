import overlayStyles from "./modal-overlay.module.css"
import PropTypes from "prop-types"

function ModalOverlay({ onClose }) {
    return (
        <div onClick={onClose} className={overlayStyles.overlay}></div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay