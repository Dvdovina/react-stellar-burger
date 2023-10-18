import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import { useEffect } from "react";
import { FC } from "react";

const modalRoot: HTMLElement | null = document.querySelector('#react-modals')!;

interface IModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

type TKeyboardEvent = {
    key: string;
}

export const Modal: FC<IModalProps> = ({ children, onClose }) => {
    useEffect(() => {
        function closeOnEsc(evt: TKeyboardEvent) {
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
                    <CloseIcon type="primary" />
                </button>
                {children}
            </div>
        </>,
        modalRoot
    );
};

export default Modal

