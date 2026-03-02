

public class secondlar{
    public static void main(String[] args){
        int arr[]={10,20,30,40,50};
        int max=Integer.MIN_VALUE;
        int second_max=Integer.MIN_VALUE;
        for(int i=0;i<arr.length;i++){
            if(arr[i]>max){
                second_max=max;
                max=arr[i];
            }
            else if(arr[i]>second_max && arr[i]!=max){
                second_max=arr[i];
            }
        }
        System.out.println("second largest element is "+second_max);
    }
}