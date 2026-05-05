import java.util.*;

public class rotated_sr{

    public static void pivot_el(int[] arr){
        int n=arr.length;

        int left=0;
        int right=n-1;
        while(left<=right){
            int mid=left+(right-mid)/2;

            if(arr[mid]<=arr[right]){
                left=mid+1;
            }else{
                right=mid;
            }
        }
        System.out.println("pivot el index is "+left);
        System.out.println("pivot el is "+arr[left]);
    }
}