import useStore from "../../../stores/Store";
import Modal, { ModalRef } from "../../template/modal/Modal";

type DeleteAccountModalRefProps = {
  modalRef: React.RefObject<ModalRef | null>;
};


function DeleteAccountModalRef({ modalRef }: DeleteAccountModalRefProps) {
  const { removeUser } = useStore();

  const handleDeleteAccount = () => {
    removeUser();
    modalRef.current?.close(); // Hesap silindikten sonra modalı kapat
  };

  return (
    <Modal ref={modalRef}>
      <div className="bg-[#171717] p-4 rounded-md w-[400px]">
        <h1 className="text-lg font-semibold">
          Hesabınızı silmek istediğinize emin misiniz?
        </h1>
        <div className="flex flex-row gap-2 mt-4">
          <button
            className={`flex-1 hover:bg-red-800 transition-colors bg-red-600 text-white px-3  rounded mt-2  cursor-pointer`}
            onClick={handleDeleteAccount}
          >
            Hesabı Sil
          </button>
          <button
            className="flex-1 bg-gray-500 transition-colors text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-gray-700"
            onClick={() => modalRef.current?.close()} // İptal butonuna basınca modalı kapat
          >
            İptal
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default DeleteAccountModalRef;