import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { useEffect } from "react";


const modalRoot = document.querySelector('#react-modals');

function Modal({ children, onClose }) {
    useEffect(() => {
        function closeOnEsc(evt) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', closeOnEsc);
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
        }
    })

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} />
            <div className={modalStyles.container}>
                <button onClick={onClose} className={modalStyles.close_btn}>
                    <CloseIcon />
                </button>
                {children}
            </div>
        </>,
        modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
  }

export default Modal

