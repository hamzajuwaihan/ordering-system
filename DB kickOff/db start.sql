PGDMP     -    3                |            ordering-system-db    12.17    12.17 +    4           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            5           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            6           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            7           1262    17607    ordering-system-db    DATABASE     �   CREATE DATABASE "ordering-system-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
 $   DROP DATABASE "ordering-system-db";
                postgres    false            �            1259    17665    ingredients    TABLE     q   CREATE TABLE public.ingredients (
    id integer NOT NULL,
    ingredient_name character varying(30) NOT NULL
);
    DROP TABLE public.ingredients;
       public         heap    postgres    false            �            1259    17663    ingredients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ingredients_id_seq;
       public          postgres    false    205            8           0    0    ingredients_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;
          public          postgres    false    204            �            1259    17691    orders    TABLE     x   CREATE TABLE public.orders (
    id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    17689    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    209            9           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    208            �            1259    17657    products    TABLE     k   CREATE TABLE public.products (
    id integer NOT NULL,
    product_name character varying(30) NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    17655    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    203            :           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    202            �            1259    17673    products_ingredients    TABLE     �   CREATE TABLE public.products_ingredients (
    id integer NOT NULL,
    product_id integer NOT NULL,
    ingredient_id integer NOT NULL
);
 (   DROP TABLE public.products_ingredients;
       public         heap    postgres    false            �            1259    17671    products_ingredients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.products_ingredients_id_seq;
       public          postgres    false    207            ;           0    0    products_ingredients_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.products_ingredients_id_seq OWNED BY public.products_ingredients.id;
          public          postgres    false    206            �            1259    17704    stock    TABLE     ~   CREATE TABLE public.stock (
    id integer NOT NULL,
    ingredient_id integer NOT NULL,
    amount numeric(10,2) NOT NULL
);
    DROP TABLE public.stock;
       public         heap    postgres    false            �            1259    17702    stock_id_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.stock_id_seq;
       public          postgres    false    211            <           0    0    stock_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.stock_id_seq OWNED BY public.stock.id;
          public          postgres    false    210            �
           2604    17668    ingredients id    DEFAULT     p   ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);
 =   ALTER TABLE public.ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �
           2604    17694 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    17660    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    17676    products_ingredients id    DEFAULT     �   ALTER TABLE ONLY public.products_ingredients ALTER COLUMN id SET DEFAULT nextval('public.products_ingredients_id_seq'::regclass);
 F   ALTER TABLE public.products_ingredients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    17707    stock id    DEFAULT     d   ALTER TABLE ONLY public.stock ALTER COLUMN id SET DEFAULT nextval('public.stock_id_seq'::regclass);
 7   ALTER TABLE public.stock ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            +          0    17665    ingredients 
   TABLE DATA           :   COPY public.ingredients (id, ingredient_name) FROM stdin;
    public          postgres    false    205   �/       /          0    17691    orders 
   TABLE DATA           :   COPY public.orders (id, product_id, quantity) FROM stdin;
    public          postgres    false    209   �/       )          0    17657    products 
   TABLE DATA           4   COPY public.products (id, product_name) FROM stdin;
    public          postgres    false    203   0       -          0    17673    products_ingredients 
   TABLE DATA           M   COPY public.products_ingredients (id, product_id, ingredient_id) FROM stdin;
    public          postgres    false    207   H0       1          0    17704    stock 
   TABLE DATA           :   COPY public.stock (id, ingredient_id, amount) FROM stdin;
    public          postgres    false    211   �0       =           0    0    ingredients_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingredients_id_seq', 1, false);
          public          postgres    false    204            >           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    208            ?           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 1, false);
          public          postgres    false    202            @           0    0    products_ingredients_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.products_ingredients_id_seq', 8, true);
          public          postgres    false    206            A           0    0    stock_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.stock_id_seq', 5, true);
          public          postgres    false    210            �
           2606    17670    ingredients ingredients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingredients DROP CONSTRAINT ingredients_pkey;
       public            postgres    false    205            �
           2606    17696    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    209            �
           2606    17678 .   products_ingredients products_ingredients_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.products_ingredients
    ADD CONSTRAINT products_ingredients_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.products_ingredients DROP CONSTRAINT products_ingredients_pkey;
       public            postgres    false    207            �
           2606    17662    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    203            �
           2606    17709    stock stock_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_pkey;
       public            postgres    false    211            �
           2606    17697    orders orders_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_product_id_fkey;
       public          postgres    false    2717    209    203            �
           2606    17684 <   products_ingredients products_ingredients_ingredient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_ingredients
    ADD CONSTRAINT products_ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id) ON DELETE CASCADE;
 f   ALTER TABLE ONLY public.products_ingredients DROP CONSTRAINT products_ingredients_ingredient_id_fkey;
       public          postgres    false    205    2719    207            �
           2606    17679 9   products_ingredients products_ingredients_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products_ingredients
    ADD CONSTRAINT products_ingredients_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.products_ingredients DROP CONSTRAINT products_ingredients_product_id_fkey;
       public          postgres    false    203    207    2717            �
           2606    17710    stock stock_ingredient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.stock
    ADD CONSTRAINT stock_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.stock DROP CONSTRAINT stock_ingredient_id_fkey;
       public          postgres    false    205    2719    211            +   7   x�3�tJMM�2�t�HM-N�2�������2��O/-*�2���M,������ 7$�      /      x������ � �      )   +   x�3�t*-JO-�2��MM,IJ��)�2���LJJ������� �	�      -   0   x�ȱ  ���g A���:�d����I�b+m�f������-��|T      1   0   x�-��  ��l1('4C�u ��e�	������I��8���$=^'
.     