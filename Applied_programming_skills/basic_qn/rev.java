import java.util.*;

public class rev{

    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        
        int num=1234;
        int rev=0;
      while(num!=0){
        int last_d=num%10;
        rev=rev*10+last_d;
        num=num/10;
      }
        System.out.println(rev);
    
    }
}