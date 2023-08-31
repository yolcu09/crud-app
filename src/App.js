import { useState } from "react";
import { v4 as getPass } from "uuid";
import BookCard from "./components/BookCard";
import EditModal from "./components/EditModal";
import DeleteModal from "./components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    // kitap ismine erişip tutma
    const title = e.target[0].value;

    if (!title) {
      toast.warn("Lütfen kitap ismi giriniz");
      return;
    }

    // kitap objesi
    const newBook = {
      id: getPass(),
      title,
      date: new Date(),
      isRead: false,
    };

    setBooks([newBook, ...books]);

    e.target[0].value = "";

    // sağ üstte bildirim verme
    toast.success("Kitap başarıyla eklendi", { autoClose: 2500 });
  };

  // modal'ı silme olayı
  const handleModal = (id) => {
    // modal ı açar
    setShowDelete(true);
    // silinecek kitabın id sini state e aktarma
    setDeleteId(id);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // id'sini bildiğimiz elemanı diziden çıkarma
    const filtred = books.filter((book) => book.id !== deleteId);

    // state i güncelle
    setBooks(filtred);

    // modal ı kapat
    setShowDelete(false);

    // silmeden sonra sağ üstte bildirim için
    toast.error("Kitap başarıyla silindi", { autoClose: 2500 });
  };

  //okundu işleminde çalışan fonk.
  const handleRead = (editItem) => {
    // okundu değerini tersine çevirme
    const updated = { ...editItem, isRead: !editItem.isRead };

    // // state nin kopyasını alma
    // const clone = [...books];
    // //  düzenlenecek elemanın sırasını bulma
    // const index = books.findIndex((book) => book.id === updated.id);
    // // clone diziyi güncelleme
    // clone[index] = updated;
    //  ! 2.nci yöntem
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );

    // state i güncelleme
    setBooks(newBooks);
  };

  const handleEditModal = (item) => {
    // modal ı açar
    setShowEdit(true);
    // düzenlenecek elemanı state e aktarma
    setEditingItem(item);
  };

  // elemanı düzenleme
  const updateItem = () => {
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    // state i güncelleme
    setBooks(newBooks);

    // modal ı kapatma
    setShowEdit(false);

    //  bildirim verme
    toast.info("Kitap düzenlendi", { autoClose: 2000 });
  };

  return (
    <div className="App">
      <header className="bg-dark text-light fs-5 text-center">
        <h1>KiTAP KURDU</h1>
      </header>
      <main className="container">
        {/* {form alanı} */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 p-4 mt-4">
          <input
            className="form-control shadow"
            type="text"
            placeholder="Bir Kitap İsmi Giriniz..."
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {/* kitaplar listesi boşsa yazı ile belirtme */}
        {books.length === 0 && (
          <h4 className="mt-5 text-center">
            Henüz herhangi bir kitap eklenmedi
          </h4>
        )}

        {/* kitaplar listesi */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            data={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>
      {/* MODALL */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}

      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setShowEdit={setShowEdit}
          setEditingıtem={setEditingItem}
          updateItem={updateItem}
        />
      )}

      {/* sağ üsteki bildirimler için */}
      <ToastContainer />
    </div>
  );
}

export default App;
