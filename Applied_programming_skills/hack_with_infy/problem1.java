import java.util.*;

public class problem1{

    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int[] a=new int[n];
        for(int i=0;i<n;i++){
            a[i]=sc.nextInt();
        }
        int q=sc.nextInt();
        int res=0;
        for(int i=0;i<q;i++){
            int t=sc.nextInt();
            int l=sc.nextInt();
            int r=sc.nextInt();

           
           if(t==1){
            for(int j=l;j<=r;j++){
                a[j]=(j-l+1)*a[l];
            }
           } if(t==2){
            int sum=0;
            for(int j=l;j<=r;j++){
                sum+=a[j];
            }
             res=res+sum;

           }

        }
                    System.out.println(res);

    
    }
}