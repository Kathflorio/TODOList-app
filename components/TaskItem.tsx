import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Task } from '../context/TaskContext';

interface TaskItemProps {
	task: Task;
	onToggle: () => void;
	onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
	return (
		<View style={styles.item}>
			<Text style={task.completed ? styles.completed : styles.text}>
				{task.text}
			</Text>

			<Button
				title={task.completed ? 'Desmarcar' : 'Completar'}
				onPress={onToggle}
			/>

			<Button
				title="🗑"
				onPress={onDelete}
				color="red"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		padding: 10,
		marginVertical: 4,
		borderWidth: 1,
		borderRadius: 4,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 16,
		flex: 1,
	},
	completed: {
		fontSize: 16,
		textDecorationLine: 'line-through',
		color: 'gray',
		flex: 1,
	},
});
