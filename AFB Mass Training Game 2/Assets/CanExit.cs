using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CanExit : MonoBehaviour
{

    public Selected10 A10;
    public Selected10 B10;
    public Selected10 C10;
    public Selected10 D10;

    public GameObject modFinished;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void OnMouseDown()
    {
        if (A10.didPass() || B10.didPass() || C10.didPass() || D10.didPass())
        {
            Instantiate(modFinished.gameObject);
        }
    }

}
