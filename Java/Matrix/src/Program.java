public class Program {

    public static void main(String[] args) throws Exception {
        Matrix matrix = new Matrix(3,3);
        matrix.construct(new double[][]{{1,2,3},{4,5,6},{7,8,9}});
        System.out.println(Matrix.det(matrix));
        //System.out.println(Matrix.inverse(matrix));

        Matrix small = new Matrix(2,2);
        small.construct(new double[][]{{1,2},{3,4}});
        System.out.println(Matrix.det(small));
        System.out.println(Matrix.inverse(small));
        System.out.println(Matrix.multiply(Matrix.inverse(small),small));
        System.out.println(Matrix.multiply(small,Matrix.inverse(small)));
        System.out.println("t and tr");
        System.out.println(Matrix.trace(matrix));
        System.out.println(Matrix.transpose(matrix));
    }

}
