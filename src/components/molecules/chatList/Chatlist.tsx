import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useStore, { Chats } from "../../../stores/Store";
import { Loader } from "../../atoms/loader/Loader";
import { groupChatsByDate } from "../../../utils/helper";
import { GoKebabHorizontal } from "react-icons/go";
import Modal, { ModalRef } from "../../template/modal/Modal";
import { removeRoom } from "../../../utils/firebasehelper";

export const Chatlist = () => {
  const { user, fetchChats, chats } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const deleteDialogRef = useRef<ModalRef>(null);

  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chats>();

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      if (!user) return;
      await fetchChats(user.id);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const memorizedChatList = useMemo(() => {
    return groupChatsByDate(chats);
  }, [chats]);

  return (
    <ul className="">
      {loading && <Loader />}
      {memorizedChatList.map((chat, index) => (
        <li key={index} className="">
          {chat.badge && (
            <span className="text-xs font-semibold ">{chat.badge}</span>
          )}
          {chat.chats.map((chat, index) => (
            <div
              key={index}
              className="flex flex-row px-2 py-2 items-center rounded-sm hover:bg-gray-600/40  dark:hover:bg-white/10 w-full gap-2 cursor-pointer"
            >
              
              <Link className="flex flex-1" to={`chat/${chat.roomId}`}>
              
                <span className="font-normal text-sm">{chat.roomName}</span>
              </Link>
              <button
                className=" text-white rounded-full w-5 h-full flex items-center justify-center"
                onClick={async () => {
                  setSelectedChat(chat);
                  deleteDialogRef.current?.open();
                }}
              >
                <GoKebabHorizontal size={18} className="cursor-pointer hover:opacity-50 rounded-sm text-black dark:text-white"/>
              </button>
            </div>
          ))}
        </li>
      ))}
      <Modal ref={deleteDialogRef}>
        <div className="bg-[#171717] p-4 rounded-md w-[400px]">
          <h1 className="text-lg font-semibold">
            Sohbeti silmek istediğinize emin misiniz?
          </h1>
          <div className="flex flex-row gap-2 mt-4">
            <button
              className="flex-1 bg-red-500 text-white rounded-md p-2 cursor-pointer hover:bg-red-700"
              onClick={async () => {
                const currentPath = location.pathname.split("/");
                console.log(currentPath);
                if (!selectedChat) return;
                if (currentPath.includes(selectedChat?.roomId)) {
                  navigate("/");
                }
                deleteDialogRef.current?.close();
                let remove = await removeRoom(selectedChat.roomId);
                if (remove) {
                  if (!user) return;
                  await fetchChats(user?.id);
                  return;
                }
              }}
            >
              Sil
            </button>
            <button
              className="flex-1 bg-gray-500 text-white rounded-md p-2 cursor-pointer hover:bg-gray-700"
              onClick={() => {
                deleteDialogRef.current?.close();
              }}
            >
              İptal
            </button>
          </div>
        </div>
      </Modal>
    </ul>
  );
};