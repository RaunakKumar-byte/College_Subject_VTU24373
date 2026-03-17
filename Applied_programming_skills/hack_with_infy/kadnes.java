public class kadnes{

    public static void main(String[] args){
        int arr[]={-2,-3,4,-1,-2,1,5,-3};

        int curr_sum=0;
        int max_sum=Integer.MIN_VALUE;
        int ansST=-1;
        int ansEND=-1;
            int st=0;

        for(int i=0;i<arr.length;i++){
            if(curr_sum==0) st=i;
            curr_sum=curr_sum+arr[i];
            if(curr_sum>max_sum){
                max_sum=curr_sum;
                ansST=st;
                ansEND=i;
            }
            if(curr_sum<0){
                curr_sum=0;
            }

        }
        System.out.println("max_sum "+max_sum);
        for(int i=ansST;i<=ansEND;i++){
            System.out.print(arr[i]+" ");
        }
    }
}