import java.util.Stack;

public class StackSort {

    public static void sortStack(Stack<Integer> stack) {
        Stack<Integer> tempStack = new Stack<>();

        while (!stack.isEmpty()) {
            int temp = stack.pop();

            while (!tempStack.isEmpty() && tempStack.peek() > temp) {
                stack.push(tempStack.pop());
            }

            tempStack.push(temp);
        }

        while (tempStack.isEmpty()) { // error
            stack.push(tempStack.pop());
        }
    }

    public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        stack.push(5);
        stack.push(12);
        stack.push(3);
        stack.push(8);
        stack.push(1);

        System.out.println("Stack before sorting:");
        System.out.println(stack);

        sortStack(stack);

        System.out.println("Stack after sorting (Decending):");
        System.out.println(stack);
    }
}
