import java.util.*;
import java.util.Queue;

public class implementation{
    
    public static int find_max(Queue<Integer> q){
        int max=Integer.MIN_VALUE;
        while(!q.isEmpty()){
            int curr=q.remove();
            if(curr>max){
                max=curr;
            }
        }
        return max;
    }

    public static void main(String[] args){
        Scanner sc=new Scanner(System.in);
        Queue<Integer> q=new ArrayDeque<>();
        System.out.println("Enter the element of queue");
        q.add(10);
        q.add(40);
        q.add(250);
        q.add(100);
        q.add(300);

        // int maxm_el=find_max(q);
        // System.out.println("max is "+maxm_el);


        int[] arr=new int[]{1,2,3};
        System.out.println(arr.length);

        Stack <Integer> s=new Stack<>();
        s.push(10);
        s.push(20);
        System.out.println(s.poll);
                System.out.println(s.remove());


        LinkedList<Integer> l=new LinkedList<>();
        l.get(0);




    }
}