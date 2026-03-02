public class largestel{
    public static void main(String[] args){
        int arr[]={10,20,30,40,50};
        int max=Integer.MIN_VALUE;
        for(int i=0;i<arr.length;i++){
            if(arr[i]>max){
                max=arr[i];
            }
        }
        System.out.println("largest element is "+max);
    }
}