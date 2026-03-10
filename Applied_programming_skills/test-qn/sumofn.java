public class sumofn{

   
   public static int sum_of_n(int n){
    if(n==0){
        return 0;
    }
    
    return n+sum_of_n(n-1);
   }
    public static void main(String[] args){

        int n=5;
        int res=sum_of_n(n);
        System.out.println(res);
    }
}