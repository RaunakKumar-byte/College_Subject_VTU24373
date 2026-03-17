import java.util.*;

public class problem2 {

    public static int maxSubarraySum(int[] num, int k) {

        HashMap<Integer, Integer> map = new HashMap<>();
        int left = 0;
        int sum = 0;
        int max_sum = 0;

        for (int right = 0; right < num.length; right++) {

            map.put(num[right], map.getOrDefault(num[right], 0) + 1);
            sum += num[right];

            while (map.size() > k) {
                map.put(num[left], map.get(num[left]) - 1);
                sum -= num[left];

                if (map.get(num[left]) == 0) {
                    map.remove(num[left]);
                }

                left++;
            }

            max_sum = Math.max(max_sum, sum);
        }

        return max_sum;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int k = sc.nextInt();

        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        System.out.println(maxSubarraySum(a, k));
    }
}