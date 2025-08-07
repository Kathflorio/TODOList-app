import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useEffect, useState } from 'react';

export interface Task {
	id: number;
	text: string;
	completed: boolean;
}

interface TaskContextType {
	tasks: Task[];
	addTask: (text: string) => void;
	toggleTask: (id: number) => void;
	deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
	undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const loadTasks = async () => {
			const saved = await AsyncStorage.getItem('tasks');
			if (saved) setTasks(JSON.parse(saved));
		};
		loadTasks();
	}, []);

	useEffect(() => {
		AsyncStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (text: string) => {
		setTasks((prev) => [...prev, { id: Date.now(), text, completed: false }]);
	};

	const toggleTask = (id: number) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		);
	};

	const deleteTask = (id: number) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	};

	return (
		<TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
			{children}
		</TaskContext.Provider>
	);
};
