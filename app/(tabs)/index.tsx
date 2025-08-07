
import React from 'react';
import TaskItem from '@/components/TaskItem';
import HomeScreen from '@/screens/homeScreen';
import { TaskProvider } from '@/context/TaskContext';

export default function Index() {
	return (
		<TaskProvider>
			<HomeScreen />
		</TaskProvider>
	);
}
