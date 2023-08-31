const EditModal = ({
  editingItem,
  setEditingıtem,
  setShowEdit,
  updateItem,
}) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Kitab ismini düzenle</h5>
        <input
          value={editingItem.title}
          className="form-control shadow"
          type="text"
          onChange={(e) =>
            setEditingıtem({
              ...editingItem,
              title: e.target.value,
              date: new Date(),
            })
          }
        />
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={() => setShowEdit(false)}
            className="btn btn-warning"
          >
            Vazgeç
          </button>
          <button onClick={() => updateItem()} className="btn btn-success">
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
