import java.util.*;

public class primeno{

public static BigInteger factorial(int n){
    int fact=1;
    while(n>0){
        fact=fact*n;

        n--;
    }

    return fact;
}
public static boolean prime_no(int n){
    int factor=0;
    for(int i=1;i<=n;i++){
        if(n%i==0){
            factor++;
        }
    }
    if(factor==2){
        return true;
    }
    else{
        return false;
    }



}

public static void main(String[] args){
  int arr[]={11,12,13,14,15,17};
  for(int i=0;i<arr.length;i++){
    boolean isPrime=prime_no(arr[i]);
    if(isPrime){
      arr[i]=factorial(arr[i]);

    }
  
  }
  
for(int i=0;i<arr.length;i++){
  System.out.print(" "+arr[i]);
}

}
}