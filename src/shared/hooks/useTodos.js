import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createItem, deleteItem, fetchData, getItemById, toggleTaskStatus, updateItem} from "../api/todosApi.js";

export const todoKeys = {
    all: ['todos'],
    byId: (taskId) => ['todos', taskId],
};

export const useTodos = () => {
    return useQuery({
        queryKey: todoKeys.all,
        queryFn: fetchData,
    });
};

export const useGetTodo = (taskId) => {
    return useQuery({
        queryKey: todoKeys.byId(taskId),
        queryFn: () => getItemById(taskId),
        enabled: !!taskId,
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            // При успехе говорим кэшу: "список задач устарел, перекачай его"
            queryClient.invalidateQueries({queryKey: todoKeys.all});
        },
    });
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            // При успехе говорим кэшу: "список задач устарел, перекачай его"
            queryClient.invalidateQueries({queryKey: todoKeys.all});
        },
    });
};


export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            // При успехе говорим кэшу: "список задач устарел, перекачай его"
            queryClient.invalidateQueries({queryKey: todoKeys.all});
        },
    });
};


export const useToggleStatusTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleTaskStatus,
        onSuccess: () => {
            // При успехе говорим кэшу: "список задач устарел, перекачай его"
            queryClient.invalidateQueries({queryKey: todoKeys.all});
        },
    });
};