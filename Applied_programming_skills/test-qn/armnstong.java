public class armnstong{

  public static boolean is_armstrong(int n){
  
  int c=n;
  int d=n;
  int count_d=0;
    while(c!=0){
        int last_d=c%10;
        c=c/10;
        count_d++;
    }
  int sum=0;
    while(d!=0){
        int l_d=d%10;
        int p=(int)Math.pow(l_d, count_d);
        sum=sum+p;
        d=d/10;

    }
    if(sum==n){
        return true;
    }
return false;

  }
    public static void main(String[] args){
     
        int n=153;
        boolean res=is_armstrong(n);
        if(res){
            System.out.println(n+" is an armstrong number");
        } else{
            System.out.println(n+" is not an armstrong number");
        }
    }
}