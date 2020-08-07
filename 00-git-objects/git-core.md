# Git Internal Objects

---

## Init a repo

Init a new git repo, confirm objects folder is empty.

    $ git init test
    Initialized empty Git repository in /tmp/test/.git/
    $ cd test
    $ find .git/objects
    .git/objects
    .git/objects/info
    .git/objects/pack
    $ find .git/objects -type f

---

## Add text

add content

    echo 'test content' | git hash-object -w ---stdin
    d670460b4b4aece5915caf5c68d12f560a9fe3e4

get it back

    find .git/objects -type f
    .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
    test content

---

## Add a file

Add version 1 (83baae)

    $ echo 'version 1' > test.txt
    $ git hash-object -w test.txt
    83baae61804e65cc73a7201a7252750c76066a30

Add version 2 (1f7a7a)

    $ echo 'version 2' > test.txt
    $ git hash-object -w test.txt
    1f7a7a472abf3dd9643fd615f6da379c4acb3e3a

---

## Find them in OS

    $ find .git/objects -type f
    .git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
    .git/objects/83/baae61804e65cc73a7201a7252750c76066a30
    .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4

---

## Get it back

    $ rm text.txt
    $ git cat-file -p 83baae > test.txt
    $ cat test.txt
    version 1

---

# Git Object Type

- tree
- blob
- commit
- tag

---

## Tree object

    $ git cat-file -p master^{tree}
    100644 blob a906cb2a4a904a152e80877d4088654daad0c859      README
    100644 blob 8f94139338f9404f26296befa88755fc2598c289      Rakefile
    040000 tree 99f1a6d12cb4b6f19c8655fca46c3ecf317074e0      lib

---

## Data Model

![Data model](data-model-1.png)

---

## Add a tree

tree 1 (d8320f)

    $ git update-index --add --cacheinfo 100644 83baae test.txt
    $ git write-tree
    d8329fc1cc938780ffdd9f94e0d364e0ea74f579
    $ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
    100644 blob 83baae61804e65cc73a7201a7252750c76066a30      test.txt

---

## Add another tree

update index

    $ echo 'new file' > new.txt
    $ git update-index --add --cacheinfo 100644 1f7a7a test.txt
    $ git update-index --add new.txt

add tree 2 (0155eb)

    $ git write-tree
    0155eb4229851634a0f03eb265b69f5a2d56f341
    $ git cat-file -p 0155eb4229851634a0f03eb265b69f5a2d56f341
    100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
    100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt

---

## Add a tree with a sub tree

add tree 3 (3c4e9c)

    $ git read-tree --prefix=bak d8329f
    $ git write-tree
    3c4e9cd789d88d8d89c1073707c3585e41b0e614
    $ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
    040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579      bak
    100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
    100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt


---

## What We get now

![Data model](data-model-2.png)

---

# Commit Object

---

## add a commit

commit 1 (fdf4fc)

    $ git commit-tree -m 'first commit' d8320f
    fdf4fc3344e67ab068f836878b6c4951e3b15f3d

    $ git cat-file -p fdf4fc3
    tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579
    author Scott Chacon <schacon@gmail.com> 1243040974 -0700
    committer Scott Chacon <schacon@gmail.com> 1243040974 -0700

    first commit

---

## add more commits

commit 2 (cac0ca)
commit 3 (1a410)

    $ echo 'second commit' | git commit-tree 0155eb -p fdf4fc3
    cac0cab538b970a37ea1e769cbbde608743bc96d
    $ echo 'third commit'  | git commit-tree 3c4e9c -p cac0cab
    1a410efbd13591db07496601ebc7a059dd55cfe9


---

## get history

    $ git log --stat 1a410e
    commit 1a410efbd13591db07496601ebc7a059dd55cfe9
    Author: Scott Chacon <schacon@gmail.com>
    Date:   Fri May 22 18:15:24 2009 -0700

        third commit

    bak/test.txt | 1 +
    1 file changed, 1 insertion(+)

    commit cac0cab538b970a37ea1e769cbbde608743bc96d
    Author: Scott Chacon <schacon@gmail.com>
    Date:   Fri May 22 18:14:29 2009 -0700

        second commit

    new.txt  | 1 +
    test.txt | 2 +-
    2 files changed, 2 insertions(+), 1 deletion(-)

    commit fdf4fc3344e67ab068f836878b6c4951e3b15f3d
    Author: Scott Chacon <schacon@gmail.com>
    Date:   Fri May 22 18:09:34 2009 -0700

        first commit

    test.txt | 1 +
    1 file changed, 1 insertion(+)

---

## What We got

    $ find .git/objects -type f
    .git/objects/01/55eb4229851634a0f03eb265b69f5a2d56f341 # tree 2
    .git/objects/1a/410efbd13591db07496601ebc7a059dd55cfe9 # commit 3
    .git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a # test.txt v2
    .git/objects/3c/4e9cd789d88d8d89c1073707c3585e41b0e614 # tree 3
    .git/objects/83/baae61804e65cc73a7201a7252750c76066a30 # test.txt v1
    .git/objects/ca/c0cab538b970a37ea1e769cbbde608743bc96d # commit 2
    .git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4 # 'test content'
    .git/objects/d8/329fc1cc938780ffdd9f94e0d364e0ea74f579 # tree 1
    .git/objects/fa/49b077972391ad58037050f2a75f74e3671e92 # new.txt
    .git/objects/fd/f4fc3344e67ab068f836878b6c4951e3b15f3d # commit 1

---

![Data model](data-model-3.png)

---

## Use git log to show

    $ echo 1a410efbd13591db07496601ebc7a059dd55cfe9 \
      > .git/refs/heads/master
    $ g log
    b5ee124 third commit (Ryan Wang, 5 minutes ago)
    e7c2640 second commit (Ryan Wang, 6 minutes ago)
    a05942f first commit (Ryan Wang, 20 minutes ago)

---

## Resources

### Markdown

https://gist.github.com/wongyouth/3c50444beca02ee5a96e7898a669c3d4

### Screencast

https://asciinema.org/a/hFCXyWlQ49ZyFBU6hoAOFnZYC

---

## Credits to

- https://book.git-scm.com/book/en/v2/Git-Internals-Git-Objects
- https://book.git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-Git-%E5%AF%B9%E8%B1%A1
- https://github.com/webpro/reveal-md
- https://github.com/asciinema/asciinema


---

# The End

Thanks for your listening

