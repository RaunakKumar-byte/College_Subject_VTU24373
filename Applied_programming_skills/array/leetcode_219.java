class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        int n=nums.length;
   

        HashMap<Integer, Integer> hs=new HashMap<>();
        for(int i=0;i<n;i++){
            if(hs.containsKey(nums[i])){
                if(i - hs.get(nums[i]) <= k){
                    return true;
                }
            }
            hs.put(nums[i],i);
        }
        return false;
    }
}