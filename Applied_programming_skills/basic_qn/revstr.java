public class revstr{

    public static void main(String[] args){

        int num=1234;

        String str=String.valueOf(num);
        StringBuilder sb=new StringBuilder(str);
        System.out.println(sb.reverse());

        System.out.println(sb.reverse().toString());

        int a=Integer.parseInt(sb.reverse().toString());
        System.out.println(a);
    }
}