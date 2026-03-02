import java.util.*;

public class freq{


    public static void main(String[] args){
        HashMap<Integer, Integer> map=new HashMap<>();
        int arr[]={1,1,1,2,2,3};
        for(int i=0;i<arr.length;i++){
            map.put(arr[i], map.getOrDefault(arr[i], 0)+1);
        }
        int max=0;
      for(Integer key:map.keySet()){
          if(map.get(key)>max){
              max=map.get(key);
          }
      }
        System.out.println(max);
        System.out.println(map);
    }
}