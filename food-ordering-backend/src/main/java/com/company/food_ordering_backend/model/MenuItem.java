public class MenuItem {
    private Long id;
    private String name;
    private double price;
    private boolean isActive;

    public MenuItem(Long id, String name, double price, boolean isActive){
        this.id = id;
        this.name = name;
        this.price = price;
        this.isActive = isActive;
    }

    public Long getId(){
        return id;
    }
       public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public boolean isActive() {
        return isActive;
    }
}