public class StringSort {

    public static String sortString(String input) {
        char[] charArray = input.toCharArray();
        int n = charArray.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (charArray[j] > charArray[j + 1]) {
                    char temp = charArray[j];
                    charArray[j] = charArray[j + 1];
                    charArray[j + 1] = temp;
                }
            }
        }
        return new String(charArray);
    }

    public static void main(String[] args) {
        String input = "hello world";
        String sortedString = sortString(input);
        System.out.println("Original String: " + input);
        System.out.println("Sorted String: " + sortedString);
    }
}