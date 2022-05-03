import "./CreateRoom.css";

export default function CreateRoom() {
  return (
    <div className="createRoom">
      <h1>Name your new room</h1>
      <input
        className="customizedInput"
        placeholder="Ex: vi som älskar bolibompa"
      ></input>
      <button className="customizedButton">Create Room</button>
    </div>
  );
}
