import React, { useContext, useState } from 'react';
import {
	Button,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import TaskItem from '../components/TaskItem';
import { TaskContext } from '../context/TaskContext';

export default function HomeScreen() {
	const context = useContext(TaskContext);
	const [text, setText] = useState('');

	if (!context) return null;

	const { tasks, addTask, toggleTask, deleteTask } = context;

	const handleAdd = () => {
		if (text.trim()) {
			addTask(text);
			setText('');
		}
	};

	const pendingTasks = tasks.filter((task) => !task.completed);
	const completedTasks = tasks.filter((task) => task.completed);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mis Tareas</Text>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					value={text}
					onChangeText={setText}
					placeholder="Nueva tarea..."
				/>
				<Button
					title="Agregar"
					onPress={handleAdd}
				/>
			</View>

			<Text style={styles.sectionTitle}>Por hacer</Text>
			<FlatList
				data={pendingTasks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TaskItem
						task={item}
						onToggle={() => toggleTask(item.id)}
						onDelete={() => deleteTask(item.id)}
					/>
				)}
				ListEmptyComponent={<Text>No hay tareas pendientes.</Text>}
			/>

			<Text style={styles.sectionTitle}>Completadas</Text>
			<FlatList
				data={completedTasks}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<TaskItem
						task={item}
						onToggle={() => toggleTask(item.id)}
						onDelete={() => deleteTask(item.id)}
					/>
				)}
				ListEmptyComponent={<Text>No hay tareas completadas.</Text>}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		marginTop: 50,
	},
	title: {
		fontSize: 24,
		marginBottom: 10,
		fontWeight: 'bold',
	},
	sectionTitle: {
		fontSize: 20,
		marginTop: 20,
		marginBottom: 10,
		fontWeight: '600',
	},
	inputContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		padding: 8,
		marginRight: 8,
		borderRadius: 4,
	},
});
