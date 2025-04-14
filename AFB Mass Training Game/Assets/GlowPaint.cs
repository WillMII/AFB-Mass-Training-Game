using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GlowPaint : MonoBehaviour
{
    private Color startColor;
    private bool alreadyClicked;
    //public GameObject plane;
    //public Material door;
    public Material tinted;
    public Material clear;
    //public var yellow;
    // Start is called before the first frame update
    void Start()
    {
        Renderer renderer = GetComponent<Renderer>();
        Material[] materials = renderer.materials;
        materials[1] = clear;
        renderer.materials = materials;
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnMouseEnter()
    {
        ShelfClue shelfClue = FindObjectOfType<ShelfClue>();
        bool alrInst = shelfClue.getAlrInst();
        if (!alreadyClicked && alrInst)
        {
            Renderer renderer = GetComponent<Renderer>();
            Material[] materials = renderer.materials;
            materials[1] = tinted;
            renderer.materials = materials;
            //Destroy(plane);
            Debug.Log("Over");
            Debug.Log(alreadyClicked);
            //tempColor.a = 100;
            //GetComponent<Renderer>().materials[1].color = tempColor;

            //GetComponent<Renderer>().materials[1] = tinted;
        }



    }

    void OnMouseExit()
    {
        Debug.Log("Off");
        Renderer renderer = GetComponent<Renderer>();
        Material[] materials = renderer.materials;
        materials[1] = clear;
        renderer.materials = materials;
    }


    void OnMouseDown()
    {
        alreadyClicked = true;
        //Destroy(plane);
        //.Log("Over");
        //GameObject().Destroy;
        //GetComponent<Renderer>().material.color = new Color(1, 0, 0, 1);
    }
}
