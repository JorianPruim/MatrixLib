import java.util.Arrays;

public class Matrix {
    public int x;
    public int y;
    public double[][] val;

    public Matrix(int x, int y){
        this.x = x;
        this.y = y;
        this.val = new double[y][x];
    }

    @Override
    public String toString() {
        StringBuilder string = new StringBuilder("Matrix:{\n");
        for(double[] row : this.val){
            string.append(Arrays.toString(row)).append("\n");
        }
        string.append("}");
        return string.toString();
    }


    public static Matrix clone(Matrix m){
        Matrix out = new Matrix(m.x,m.y);
        out.construct(m.val);
        return out;
    }


    public boolean construct(double[][] value){
        if(value.length != this.y){
            return false;
        }else{
            for(double[] row : value){
                if(row.length != this.x){
                    return false;
                }
            }
        }
        this.val = value;
        return true;
    }

    public void addColumns(int n){
        double[][] temp = this.val;
        this.x+=n;
        this.val = new double[this.y][this.x];
        for(int i = 0; i<temp.length; i++){
            for(int j = 0; j<temp[i].length; j++){
                this.val[i][j] = temp[i][j];
            }
        }
    }

    public void addRows(int n){
        double[][] temp = this.val;
        this.y+=n;
        this.val = new double[this.y][this.x];
        for(int i = 0; i<temp.length;i++){
            for(int j = 0; j<temp.length;j++){
                this.val[i][j] = temp[i][j];
            }
        }
    }

    public void setRow(int y, double[] arr){
        this.val[y] = arr;
    }

    public void setColumn(int x, double[] arr){
        for(int i = 0; i<arr.length; i++){
            this.val[i][x] = arr[i];
        }
    }

    public void setElement(int x, int y, double n){
        this.val[y][x] = n;
    }

    public void dropColumn(int x){
        double[][] temp = this.val;
        this.x--;
        this.val = new double[this.y][this.x];
        for(int i = 0; i<temp.length; i++){
            for(int j = 0; j<temp[i].length; j++){
                if(j==x){
                    continue;
                }else if(j<x){
                    this.val[i][j] = temp[i][j];
                }else{
                    this.val[i][j-1] = temp[i][j];
                }
            }
        }
    }

    public void dropRow(int y){
        double[][] temp = this.val;
        this.y--;
        this.val = new double[this.y][this.x];
        for(int i = 0; i<temp.length; i++){
            for(int j = 0; j<temp[i].length; j++){
                if(i==y){
                    continue;
                }else if(i<y){
                    this.val[i][j] = temp[i][j];
                }else{
                    this.val[i-1][j] = temp[i][j];
                }
            }
        }
    }

    public double[] getRow(int y){
        return this.val[y];
    }

    public double[] getColumn(int x){
        double[] col = new double[this.y];
        for(int i = 0; i<this.val.length; i++){
            col[i] = val[i][x];
        }
        return col;
    }

    public double getElement(int x, int y){
        return this.val[y][x];
    }

    public static Matrix add(Matrix m1, Matrix m2) throws Exception {
        if(m1.x != m2.x || m1.y != m2.y){
            throw new Exception("Cannot add two matrices of different sizes");
        }else{
            Matrix sum = new Matrix(m1.x,m2.y);
            for(int i = 0; i<m1.y; i++){
                for(int j = 0; j<m1.x; j++){
                    sum.setElement(j,i,(m1.getElement(i,j)+m2.getElement(i,j)));
                }
            }
            return sum;
        }
    }

    public static Matrix multiply(int c, Matrix m){
        Matrix prod = new Matrix(m.x,m.y);
        for(int i = 0; i<m.y; i++){
            for(int j = 0; j<m.x; j++){
                prod.setElement(j,i,(m.getElement(i,j)*c));
            }
        }
        return prod;
    }

    public static Matrix multiply(Matrix left, Matrix right) throws Exception{
        if(left.x != right.y) {
            throw new Exception("Unable to multiply matrices: the amount of columns on the left has to be the same as the amount of rows on the right.");
        }else{
            Matrix prod = new Matrix(right.x,left.y);
            for(int i = 0; i<left.y; i++){
                for(int j = 0; j<right.x; j++){
                    double s = 0;
                    for(int k = 0; k<right.y;k++){
                        s+=(left.getElement(k,i)*right.getElement(j,k));
                    }
                    prod.setElement(j,i,s);
                }
            }
            return prod;
        }
    }

    public static Matrix transpose(Matrix m){
        Matrix t = new Matrix(m.y,m.x);
        for(int i = 0; i<m.y; i++){
            for(int j = 0; j<m.x; j++){
                t.setElement(i,j,m.getElement(j,i));
            }
        }
        return t;
    }

    public static double trace(Matrix m){
        double tr = 0;
        int l = Math.min(m.x,m.y);
        for(int i = 0; i<l; i++){
            tr+=m.getElement(i,i);
        }
        return tr;
    }

    public static Matrix minor(int x, int y, Matrix m){
        Matrix minor = Matrix.clone(m);
        minor.dropRow(y);
        minor.dropColumn(x);
        return minor;
    }

    public static double det(Matrix m) throws Exception {
        if(m.x != m.y){
            throw new Exception("Cannot give a determinant of a non-square matrix");
        }else if(m.x == 2){
            return ((m.getElement(0,0)*m.getElement(1,1))-(m.getElement(1,0)*m.getElement(0,1)));
        }else{
            double d = 0;
            Matrix minor;
            for(int i = 0; i<m.y; i++){
                minor = Matrix.minor(i,0,m);
                if(i%2==0){
                    d+=(Matrix.det(minor)*m.getElement(i,0));
                }else{
                    d-=(Matrix.det(minor)*m.getElement(i,0));
                }
            }
            return d;
        }
    }

    public static Matrix inverse(Matrix m) throws Exception {
        if(m.x!=m.y){
            throw new Exception("Cannot take an inverse of a non-square matrix");
        }else if(Matrix.det(m)==0){
            throw new Exception("Cannot take inverse: matrix is singular");
        }else if(m.x==2){
            Matrix inv = new Matrix(2,2);
            inv.setElement(0,0,(m.getElement(1,1)/Matrix.det(m)));
            inv.setElement(1,0,(m.getElement(1,0)/Matrix.det(m)*-1));
            inv.setElement(0,1,(m.getElement(0,1)/Matrix.det(m)*-1));
            inv.setElement(1,1,(m.getElement(0,0)/Matrix.det(m)));
            return inv;
        }else {
            Matrix inv = new Matrix(m.x, m.y);
            for (int i = 0; i < m.y; i++) {
                for (int j = 0; j < m.x; j++) {
                    Matrix c = Matrix.minor(i, j, m);
                    if ((i + j) % 2 == 0) {
                        inv.setElement(j, i, Matrix.det(c) / Matrix.det(m));
                    } else {
                        inv.setElement(j, i, Matrix.det(c) / Matrix.det(m) * -1);
                    }
                }
            }
            return inv;
        }
    }

    static class Identity extends Matrix{
        public Identity(int n) {
            super(n,n);
            for(int i = 0; i<n; i++){
                this.setElement(i,i,1);
            }
        }
    }

}
