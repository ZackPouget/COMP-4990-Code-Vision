public class ReverseStringAndNumbers {

    public static String reverseStringAndNumbers(String input) {
        StringBuilder result = new StringBuilder();
        StringBuilder numberBuilder = new StringBuilder();

        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);

            if (Character.isDigit(ch)) {
                numberBuilder.append(ch);
            } else {
                if (numberBuilder.length() > 0) {
                    result.append(numberBuilder.reverse());
                    numberBuilder.setLength(0);
                }
                result.append(ch);
            }
        }

        if (numberBuilder.length() > 0) {
            result.append(numberBuilder.reverse());
        }

        return result.reverse().toString();
    }

    public static void main(String[] args) {
        String defaultInput1 = "Hello 123 World 456";
        String defaultInput2 = "Reverse 789 Numbers 321";

        String reversed1 = reverseStringAndNumbers(defaultInput1);
        System.out.println("Reversed String 1: " + reversed1);

        String reversed2 = reverseStringAndNumbers(defaultInput2);
        System.out.println("Reversed String 2: " + reversed2);
    }
}