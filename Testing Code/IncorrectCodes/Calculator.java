public class Calculator {
    public static void main(String[] args) {
        double num1 = 10;
        double num2 = 5;
        char operator = '/'; 

        double result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                assert num2 != 0 : "Error: Cannot divide by zero!";
                result = num2 / num1;  // error
                break;
            default:
                assert false : "Error: Invalid operator!";
        }

        switch (operator) {
            case '+':
                assert result == 15 : "Addition test failed!";
                break;
            case '-':
                assert result == 5 : "Subtraction test failed!";
                break;
            case '*':
                assert result == 50 : "Multiplication test failed!";
                break;
            case '/':
                assert result == 0.5 : "Division test failed!";
                break;
            default:
                assert false : "Invalid operator!";
        }

        System.out.println("Result: " + num1 + " " + operator + " " + num2 + " = " + result);
    }
}