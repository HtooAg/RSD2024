import AddForm from "./AddForm";
import CheckList from "./CheckList";

export default function App({ list, add, remove, toggle }) {
	return (
		<>
			<AddForm add={add} />
			<CheckList
				list={list.filter(item => !item.done)}
				toggle={toggle}
				remove={remove}
			/>
			<CheckList
				list={list.filter(item => item.done)}
				toggle={toggle}
				remove={remove}
				done={true}
			/>
		</>
	);
}
